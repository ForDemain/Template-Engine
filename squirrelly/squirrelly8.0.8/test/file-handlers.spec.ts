/* global it, expect, describe */

import { renderFile, __express } from '../src/index'

var path = require('path'),
  filePath = path.join(__dirname, 'templates/simple.sqrl')

describe('File handlers test', () => {
  it('parses a simple template', async () => {
    var renderedFile = await renderFile(filePath, { name: 'Ben' })

    expect(renderedFile).toEqual('Hi Ben')
  })

  it('renderFile and __express are equivalent', async () => {
    expect(renderFile).toEqual(__express)
  })

  it('render file with callback works', done => {
    function cb (err: Error | null, res?: string) {
      try {
        expect(res).toBe('Hi Ada Lovelace')
        done()
      } catch (error) {
        done(error)
      }
    }

    renderFile(filePath, { name: 'Ada Lovelace', async: true }, cb)
  })

  it('parses a simple template w/ a callback', async () => {
    renderFile(filePath, { name: 'Ben' }, function (err, res) {
      expect(res).toEqual('Hi Ben')
    })
  })

  it('parses a simple template w/ cache', async () => {
    renderFile(filePath, { name: 'Ben', cache: true }, function (err, res) {
      expect(res).toEqual('Hi Ben')
    })
  })

  // TODO: the above doesn't even really do anything

  it('parses a simple template w/ settings from Express', async () => {
    renderFile(
      filePath,
      {
        name: 'Ben',
        cache: true,
        settings: {
          views: ['templates', 'othertemplates'],
          'view cache': true,
          'view options': { autoEscape: false }
        }
      },
      function (err, res) {
        expect(res).toEqual('Hi Ben')
      }
    )
  })
})

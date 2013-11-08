db = require '../helpers/db_connector'

describe 'DB', () ->
  describe 'Connect', () ->
    it 'db should connect', () ->
      assert.isNotNull db.start_session
import {
  datastore as Datastore,
  path,
  pathToDb,
  crypt,
} from '../../localModules'

const key = 'bFr3r5iRkiTWf3r-a8GsHVZUgpAtDL7X'

export const rancheck = new Datastore({
  afterSerialization: (doc: string) => {
    const cipher = crypt.createCipher('aes-256-ctr', key)
    let encrypted = cipher.update(doc, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  },
  beforeDeserialization: (encrypted: string) => {
    const decipher = crypt.createDecipher('aes-256-ctr', key)
    let doc = decipher.update(encrypted, 'hex', 'utf8')
    doc += decipher.final('utf8')

    return doc
  },
  filename: path.join(pathToDb, 'rancheck.db'),
  autoload: true,
})

export const projects = new Datastore({
  afterSerialization: (doc: string) => {
    const cipher = crypt.createCipher('aes-256-ctr', key)
    let encrypted = cipher.update(doc, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  },
  beforeDeserialization: (encrypted: string) => {
    const decipher = crypt.createDecipher('aes-256-ctr', key)
    let doc = decipher.update(encrypted, 'hex', 'utf8')
    doc += decipher.final('utf8')

    return doc
  },
  filename: path.join(pathToDb, 'projects.db'),
  autoload: true,
})

export const users = new Datastore({
  afterSerialization: (doc: string) => {
    const cipher = crypt.createCipher('aes-256-ctr', key)
    let encrypted = cipher.update(doc, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  },
  beforeDeserialization: (encrypted: string) => {
    const decipher = crypt.createDecipher('aes-256-ctr', key)
    let doc = decipher.update(encrypted, 'hex', 'utf8')
    doc += decipher.final('utf8')

    return doc
  },
  filename: path.join(pathToDb, 'users.db'),
  autoload: true,
})

const fetch = require('node-fetch')
const cheerio = require('cheerio')


class Node {
    constructor(href) {
        this.host = getDomain(href)
        this.href = href
        this.id = this.createID()
        this.children = new Set()
        this.parrent = new Set()
        
        // if (getDomain(href) === origin) {
            this.getLinks(href)
        // }
    }

    // Makes dublicates for each add
    addChild(node) {
        
        if (typeof node !== 'object') {
            console.log(node, 'node is not an obejct');
            
            node = new Node(node.toLowerCase())
        }
        console.log(node);

        //    Check for same node id
        if (this.children.has(node.id)) {
            // Generate ID for node
            node.id = this.createID()
        }
        //  add node
        this.children.add(node)
        node.parrent.add(this)
        
    }

    createID() {
        return Math.random().toString(36).substr(2, 9)
    }

    childrenHasId(id) {
        // Does id exist?
        return this.children.has(id)
    }

    parrentsHasId(id) {
        // Does id exist?
        return this.parrents.has(id)
    }

    get size() {
        return this.size
    }

    deleteChildMember(id) {
        id = id.toString()
        const children = this.children
        let deleted = false

        children.forEach(child => {

            if (child.id === id) {

                deleted = children.delete(child)
                child.deleteParrentMebmer(this.id)
            }

        })

        return deleted

    }

    deleteParrentMebmer(id) {
        id = id.toString()
        const parrent = this.parrent
        let deleted = false

        parrent.forEach(child => {

            if (child.id === id) {

                deleted = parrent.delete(child)
                console.log(child.deleteChildMember(this.id));


            }

        })

        return deleted
    }

    clearChildren() {
        this.children.clear()
    }

    clearParrents() {
        this.parrent.clear()
    }



    async getLinks(url) {
        const thisObject = this
        
        const reponse = await fetch(url).catch(error => {
            throw error
        })
        const data = await reponse.text()

        console.log(url);
        

        const $ = cheerio.load(data);
        const testDomain = /\.\w{2,3}/

        $('a').each(function (i, elem) {
            let link = elem.attribs.href

            const hasDomain = testDomain.test(elem.attribs.href)
            if (!hasDomain) {
                link = craftLinks(url, link)
            }

            thisObject.addChild(link)
        });
        console.log('END OF FETCH');
        
    }

}

function getDomain(url) {
    const regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
    return url.match(regex)[0]
}

function craftLinks(url, brokenURL) {
    const domain = getDomain(url)
    return domain + brokenURL
}


module.exports = Node
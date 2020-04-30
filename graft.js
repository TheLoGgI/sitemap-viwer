const fetch = require('node-fetch')


// 1. Find depth of array
function depth(array, rec) {
    // Patrick Leonard - https://stackoverflow.com/questions/55420156/get-arrays-depth-in-javascript
    if (!Array.isArray(array)) throw new Exception('not an array');
    
    var res = rec;
    for(var i = 0; i < array.length; ++i) {
        if (Array.isArray(array[i])) {
        var subDepth = depth(array[i], rec + 1);
        if (subDepth > res) {
            res = subDepth;
        }
      }
    }
   
    return res;
    }

    function initSiblings(nodes) {
        let array = []
        
    if (nodes !== null) {
        nodes.forEach(element => {
            if (Array.isArray(element)) {
                console.log(element);
                
                initSiblings(element)
            }
            else if (typeof element === 'object') {
                array.push(element)
            } else if (typeof element === 'number') {
                array.push(new Node(element))
            } else {
                console.log(element);
            }
        });
    }

    return array
    }


/* 
    I want to create a script that can manage links and connects beteen pages.
    Build the sitemap of a page.
    1. 
*/    

function* generator(i) {
    let start = i
        while(true) {
            start++
            yield start;
            console.log(start);
            
            return start
      }
  
  }


class Node {
    constructor(name, id){
        this.name = name
        this.id = id || Math.random().toString(36).substr(2, 9);
        this.children = new Set()
        this.parrent = new Set()
    }

    // Makes dublicates for each add
   addChild(node) {
       //    Check for same node id
       if (this.children.has(node.id)) {
           // Generate ID for node
        node.id = Math.random().toString(36).substr(2, 9);
       }
    //  add node
        this.children.add(node)
        node.parrent.add(this)
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

}


// const indexpage = new Node('index page', '10000')
// const landingpage = new Node('landing page', '00000')

// for (let i = 0; i < 5; i++) {
//     indexpage.addChild(new Node('form page'))
// }



// sample code
async function getLinks(url, currentNode) {
    // if (!currentNode) {
    //     currentNode = url
    // }

    const reponse = await fetch(url)
    const data = await reponse.text()

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data,"text/html");
    console.log(htmlDoc);

    
    
    // data.forEach(item => {
    //     if (item === 'a tag') {
    //         currentNode.addChild(item.link)
            
    //     }
    // })

    // currentNode.children.forEach(child => {
    //     getLinks(child)
    // })
}

getLinks('http://lasseaakjaer.com/')
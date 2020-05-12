
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
            return start
      }
  
  }
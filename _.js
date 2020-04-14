register = {
    tag: {},
    path: {},
    add: function(thing){
        for(let location in thing.locations){
            let path = thing.locations[location]
            if(this.path[path] == undefined){

                this.path[path] = {}
                this.path[path].occupants = {}
            }
            this.path[path].occupants[thing.id] = thing
        }
        this.tag[thing.id] = thing
        return this
    },
    move: function (tag,address) {
        let thing = register.findTag(tag)
        for(let index in thing.locations){
            let location = register.findLocation(thing.locations[index])
            let destination = register.findLocation(address)
            destination.occupants[tag] = location.occupants[tag]
            delete location.occupants[tag]
            thing.locations[index] = address
        }
        
    },
    delete: function(tag){
        let thing = register.findTag(tag)
        for(let index in thing.locations){
            let location = register.findLocation(thing.locations[index])
            delete location.occupants[tag]
            delete register.tag[tag]
        }
    },
    scale: function(tag){
        let thing = register.findTag(tag) 

    },
    findLocation: function(location){
        return this.path[location]
    },
    findTag: function(tag){
        return this.tag[tag]
    }
        ,
    
}
thingProto = {
    generateId: function(name){
        let index = 0
        while(register.tag[name+toHexString(index)] != undefined){
            index++
        }
        return name+toHexString(index)
    },
    //reserved middleware functions
    addThing: function(){},
    moveThing: function(){},
    scaleThing: function(){},
}
function createThing(name,location,size=1){
    const thing = Object.create(thingProto)
    thing.id = thing.generateId(name)
    thing.locations = [location]
    thing.size = size
    register.add(thing,location)
}
function createToken(name,location,size){}
function createContainer(name,location,size){}
function toHexString (index){
    return index.toString(16).padStart(2,0)
}

let register = r
createThing("bobby","grid01_tile0212")
createThing("bobby","grid01_tile0212")
createThing("billy","grid01_tile0212")
createThing("kim","grid01_tile0000")
let kim = register.findTag("kim00")
r.move("kim00","grid01_tile0212")
r.delete("bobby00")
console.log(r)
// console.log(register.findLocation("grid01_tile0212").occupants)
// console.log(register.findTag("bobby01"))
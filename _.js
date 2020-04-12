function Thing(id,address,render){
this.id = id
this.type = parseTag(id,"type")
this.index = parseTag(id,"index")
this.render = render

// this.address = "stage>container>container>   contained"
// this.address = "stage>grid00>tile02a4>   contained"
this.addresses = [address]
this.u = [parseAddress(address,"u")]
this.v = [parseAddress(address,"v")]
this.parent = ""

return this
}
    function Container(...,occupants){
        // parent: Thing
        container = new Thing(...)
        container.occupants = occupants
        return container
    }
    function Contained(...,){
        // parent: Thing
        contained = new Thing(...)
        return contained
    }


occupants
    //stage>grid00>tile02a3>token0a
    container: 
    u: u
    v: v
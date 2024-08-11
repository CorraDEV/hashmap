import Entry from "./Entry.mjs";

export default function HashMap(initialCapacity = 12, loadFactor = 0.5){
    return{
        buckets: new Array(initialCapacity),
        capacity: initialCapacity,
        hash: function(key){
            if(!key){
                throw new Error("No key provided");
            }
            
            let hashCode = 0;               
            const primeNumber = 31;
            
            for(let i = 0; i < key.length; i++){
                hashCode = primeNumber * hashCode + key.charCodeAt(i);
            }
         
            return hashCode;
        }, 
        set: function(key, value){            
            let num_elem = 0;
            
            for(let i = 0; i < this.buckets.length; i++){
                if(this.buckets[i]){
                    num_elem++;
                }
            }

            if(num_elem / this.capacity >= loadFactor){
                this.capacity *= 2;
                const oldBuckets = this.buckets;                
                this.buckets = new Array(this.capacity);

                for(let i = 0; i < oldBuckets.length; i++){
                    let current = oldBuckets[i];
                    while(current){
                        this.set(current.key, current.value); 
                        current = current.nextNode;
                    }
                }
            }

            const index = this.hash(key) % this.capacity;             

            if(index < 0 || index >= this.buckets.length){
                throw new Error("Trying to access index out of bound");
            }

            if(this.buckets[index]){
                let current = this.buckets[index];
                
                while(current.nextNode && current.key !== key){
                    current = current.nextNode;
                }                                

                if(current.key === key){
                    current.value = value;
                }
                else{
                    current.nextNode = new Entry(key, value);                                        
                }                
            }
            else{
                this.buckets[index] = new Entry(key, value);
            }
        }, 
        get: function(key){
            const index = this.hash(key) % this.capacity;
            
            if(index < 0 || index >= this.buckets.length){
                throw new Error("Trying to access index out of bound");
            }

            if(this.buckets[index]){
                let current = this.buckets[index];
                
                while(current && current.key !== key){
                    current = current.nextNode;
                }
                
                if(!current){
                    return null;
                }                
                else{
                    return current.value;
                }                
            }
            else{
                return null;
            }
        },
        has: function(key){
            const index = this.hash(key) % this.capacity;
            
            if(index < 0 || index >= this.buckets.length){
                throw new Error("Trying to access index out of bound");
            }

            if(this.buckets[index]){
                let current = this.buckets[index];
                
                while(current && current.key !== key){
                    current = current.nextNode;
                }
                
                if(!current){
                    return false;
                }                
                else{
                    return true;
                }                 
            }
            else{
                return false;
            }
        },
        remove: function(key){
            const index = this.hash(key) % this.capacity;
            
            if(index < 0 || index >= this.buckets.length){
                throw new Error("Trying to access index out of bound");
            }

            if(this.buckets[index]){
                let current = this.buckets[index];            
                
                while(current){
                    let next = current.nextNode;
                    
                    if(current.key === key){
                        this.buckets[index] = next;
                        return true;
                    }
                    else if(next.key === key){
                        current.nextNode = next.nextNode;
                        return true;
                    }
                    current = next;
                }                                                 
            }
            else{
                return false;
            }            
        },
        length: function(){
            let num_keys = 0;
            
            for(let i = 0; i < this.buckets.length; i++){
                let current = this.buckets[i];
                
                while(current){
                    if(current.key !== null && current.key !== undefined){
                        num_keys++;
                    }
                    current = current.nextNode;
                }
            }

            return num_keys;
        },
        clear: function(){
            for(let i = 0; i < this.buckets.length; i++){
                delete this.buckets[i];
            }
        },
        keys: function(){
            const keys = [];
            
            for(let i = 0; i < this.buckets.length; i++){
                let current = this.buckets[i];
                
                while(current){
                    keys.push(current.key);
                    current = current.nextNode;
                }
            }

            return keys;
        },
        values: function(){
            const values = [];
            
            for(let i = 0; i < this.buckets.length; i++){
                let current = this.buckets[i];
                
                while(current){
                    values.push(current.value);
                    current = current.nextNode;
                }
            }

            return values;
        },
        entries: function(){
            const entries = [];
            
            for(let i = 0; i < this.buckets.length; i++){
                let current = this.buckets[i];
                
                while(current){
                    entries.push([current.key, current.value]);
                    current = current.nextNode;
                }
            }

            return entries;
        }
    }
}
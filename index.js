<script>
    if (window.fetch) {
        //Affiche YODA
        afficheYoda = function() {
            for(let i=1; i<89; i++) {
                fetch("https://swapi.co/api/people/"+i+"/").then((data)=>{
                    return data.json()
                }).then((json)=>{
                    if(json.name == "Yoda"){
                        console.log(`Grand tu seras AkA : ${json.name}`)
                    }
                })
            }
        }
        
        // Espèce de + de 2 persos
        afficheEspeces = function() {
            for(let i=1; i<37; i++) {
                fetch("https://swapi.co/api/species/"+i+"/").then((data)=>{
                    return data.json()
                }).then((json)=>{
                    if(json.people.length >= 2){
                        console.log(`Espèce contenant + de 2 personnages : ${json.name}`)
                    }
                })
            }
        }

        // Taille de tous les humains réunis
        afficheTailleHumains = function() {
            let linksHumans = []
            let humansHeight = []
            let humansHeightTotal;

            fetch("https://swapi.co/api/species/1/").then((data)=>{
                return data.json()
            }).then((json)=>{
                json.people.map((humainLink, index) => {
                    linksHumans.push(humainLink)
                })
            }).then((taille) => {
                linksHumans.map(linksHuman => {

                    fetch(linksHuman).then((data)=>{
                        return data.json()
                    }).then((json)=>{
                        if(!isNaN(json.height)) {
                            humansHeight.push(parseInt(json.height))
                            return humansHeight
                        }
                    })
                })
            }).then((total) => {
                window.setTimeout(()=>{
                    const arrayAddition = (accumulator, currentValue) => accumulator + currentValue;
                    humansHeightTotal = humansHeight.reduce(arrayAddition)
                    console.log("total : " +humansHeightTotal)
                }, 2000)
            })
        }

        //Info Humains
        
        afficheInfoHumains = function() {
                let linksHumans = []
                let humansHeight = []
                let humansHeightTotal;

                fetch("https://swapi.co/api/species/1/").then((data)=>{
                    return data.json()
                }).then((json)=>{
                    json.people.map((humainLink, index) => {
                        linksHumans.push(humainLink)
                    })
                }).then((infos) => {
                    linksHumans.map(linksHuman => {

                        fetch(linksHuman).then((data)=>{
                            return data.json()
                        }).then((json)=>{
                            fetch(json.homeworld).then(data => {
                                return data.json()
                            }).then( (json) => {
                                console.log("nom : " + json.name + ", Taille : " + json.height +", poids : " +  json.mass )

                                json.films.map(film => {
                                    fetch(film).then(data => {
                                        return data.json()
                                    }).then(filmList => {
                                        console.log("film : " + json.name)
                                    })
                                })

                                console.log("Planète d'origine : " + json.name)
                            })
                        })
                        
                    })
                })
            }

    } else {
        console.log('Pas ok')
    }
</script>

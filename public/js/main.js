const logoutButton = document.querySelector('#logoutButton');

if(logoutButton){
    logoutButton.addEventListener('click', () => {
        axios.post('/logout')
            .then(()=>{
                document.location.reload(true);
            })
    })
}

// SEARCH GUILD
if(window.location.href.indexOf("/profil")){
    let contents = []
    axios.get('/guilds')
        .then((res)=>{
            let guilds = res.data
            Array.from(guilds).forEach(guild => {
                contents.push('<input type="button" class="dropdown-item" type="button" data-guild-id="' + guild.id +'" value="' + guild.guildname + '"/>')
            });
            
            document.querySelectorAll('#menuItems').forEach(menuItem => {
                menuItem.innerHTML = contents.join("")
                $(document.querySelectorAll('#empty')).hide()
            })
        
        })
    
    let searchGuildInput = document.querySelectorAll(".searchGuild")

    searchGuildInput.forEach(search => {
        search.addEventListener('input', () => {
            let guildFound = []
            if(search.value){
                axios.get('/guildsearch/'+search.value)
                    .then((res) => {
                        if(res.data.length === 0){
                            $(search).parent().find('#empty').show()
                        } else {
                            $(search).parent().find('#empty').hide()
                            Array.from(res.data).forEach(guild => {
                                guildFound.push('<input type="button" class="dropdown-item" type="button" data-guild-id="' + guild.id +'" value="' + guild.guildname + '"/>')
                            })
                        }
                    })
                    .then(()=>{
                        search.nextElementSibling.innerHTML = guildFound.join("")
                    })
            } else {
                $(search).parent().find('#empty').hide()
                search.nextElementSibling.innerHTML = contents.join("")
            }
        })
    });
    
    // $('#menuItems').on('click', '.dropdown-item', function(){

    // })
}
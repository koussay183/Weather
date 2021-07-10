$( async ()=>{
    const make = await weather.fetchApi('siliana');
    const thenhide = await $('.prelaoder').hide(); 
})
let weather = {
    apiKey:"21d79011b99e2d42bc2cb71fa6dd9208",
    fetchApi : function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
        .then(data => {this.displayRes(data)})
    },
    displayRes : (data) => {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        $("#city-name").text(name);
        $("#temp").text(Math.round(temp));
        $(".icon-holder>img").attr('src',`http://openweathermap.org/img/wn/${icon}@2x.png`);
        $("#descreption").text(description);
        $("#humidity").text(humidity);
        $("#speed").text(speed);
    },
    search:function (){
        this.fetchApi(document.querySelector('.search-bar').value)
    }

}
$('#submit').click(()=>{
    weather.search();
    document.querySelector('.search-bar').value = '';
})
$('#search-bar').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        weather.search();
        document.querySelector('.search-bar').value = '';
    }
});








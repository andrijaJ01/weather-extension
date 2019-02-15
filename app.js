window.addEventListener('load' , () => {
  let long;
  let lat;
  let temperatureDescription= document.querySelector('.temperature-description');
  let temperatureDegree= document.querySelector('.temperature-degree');
  let locationTimezone= document.querySelector('.location-timezone');
 let temperatureSection= document.querySelector('.temperature');
 let temperatureSpan = document.querySelector(".temperature span");

  if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{
    long= position.coords.longitude;
    lat= position.coords.latitude;
    let proxy=`https://cors-anywhere.herokuapp.com/`;
    const api=`${proxy}https://api.darksky.net/forecast/12f1d8d0131f47adbbea855ec9be7b5f/${lat},${long}`;

    fetch(api)
          .then(response =>{return response.json(); })
          .then(data     =>{
              const {temperature, summary, icon} = data.currently;
              temperatureDegree.innerHTML=temperature;
              temperatureDescription.innerHTML=summary;
              locationTimezone.innerHTML= data.timezone;
              //formula for celsius
              let celsius= (temperature-32)*(5/9);
              //icons for weather
              setIcons(icon, document.querySelector('.icon'));
              //change to celsius/farentheit on click
              temperatureSection.addEventListener('click',()=>{
                if (temperatureSpan.textContent==='F'){
                  temperatureSpan.textContent='C';
                  temperatureDegree.innerHTML=Math.floor(celsius);
                }else{
                  temperatureSpan.textContent='F';
                  temperatureDegree.innerHTML=temperature;
 }
              })
  })
  });

}

function setIcons(icon, iconID){
const skycons = new Skycons();
  const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
});

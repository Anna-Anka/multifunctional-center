const testFunction = () => {
    fetch(urlFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error');
            }
            return response.json();
        })
        .then(res => {
            pins = res.pins
            settings = res.mapSettings
            // console.log(res, pins, settings);
            console.log(res);
            initMap();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}
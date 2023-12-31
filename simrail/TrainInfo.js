const search = new URLSearchParams(window.location.search);
let trainNumber = null;

if (search.has('train')) {
    trainNumber = search.get('train');
}

if (trainNumber) {
    getTrainData();
}

function getTrainData() {
    $.ajax({
        url: `https://panel.simrail.eu:8084/trains-open?serverCode=en1`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const trains = data.data;
            //console.log(trains);

            for(let i = 0; i < trains.length; i++) {

                if(trains[i].TrainNoLocal === trainNumber) {
                    console.log(trains[i]);
                    document.getElementById("speed").innerText = Math.round(parseInt(trains[i].TrainData.Velocity));
                }

            }
        },
        error: function (error) {
            console.error(error);
        }
    })

    setTimeout(getTrainData, 2500);

}
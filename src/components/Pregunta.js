import React, { useState } from "react";

const Pregunta = ({ pregunta = {} }) => {
  const [disable, setDisable] = useState(false);
  const [ hours, setHours ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] = useState(0);

  var myfunc = setInterval(function () {
    // code goes here
    var t1 = new Date(pregunta.date_end);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();
    // Time calculations for days, hours, minutes and seconds
    if(dif > 0){
      setHours(Math.floor(dif / (1000 * 60 * 60)));
      setMinutes(Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((dif % (1000 * 60)) / 1000));
    }
    if (dif < 0) {
      setDisable(true);
      clearInterval(myfunc);
    }
  }, 1000);
  const handleResponse = (opcion_id) => {
    if(disable){
      alert('se te acabo tu tiempo')
    }
    else{
      let params = {
        pregunta_id: pregunta.id,
        opcion_id: opcion_id,
      };
  
      fetch("http://127.0.0.1:8000/api/respuesta", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authentication: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });

    }
  };

  return (
    <div
      className={
        disable ? "p-4 w-full lg:w-1/2 hidden" : "p-4 w-full lg:w-1/2"
      }
    >
      <div className=" border-2 rounded-lg border-gray-200 border-opacity-50 p-8">
        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          { `${hours < 10 ? '0'+hours : hours }:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}` }
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
            {pregunta.pregunta}
          </h2>
          <p className="leading-relaxed text-base">{pregunta.subtitle}</p>
          <div className="flex sm:flex-row flex-col">
            {pregunta.opciones.length > 0 &&
              pregunta.opciones.map((opcion) => {
                return (
                  <a
                    key={opcion.id}
                    onClick={() => handleResponse(opcion.id)}
                    className="mt-3 text-indigo-500 inline-flex items-center"
                  >
                    {opcion.opcion}
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pregunta;

import React from "react";
import Pusher from "pusher-js";
import Pregunta from '../components/Pregunta';
import {PUSHER_APP_KEY, PUSHER_OPTIONS} from '../../config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntas: [],
    };
  }

  componentDidMount() {
    console.log("componentDidMount in Home");
    fetch('http://127.0.0.1:8000/api/preguntas/',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authentication": `Bearer ${window.sessionStorage.getItem("token")}`,
            }
        })
        .then(res => res.json())
        .then(response => {
            let result = response.preguntas;
            if(result){
              console.log(result);
              this.setState({
                preguntas: result
              });

            }
        })
        .catch(error => {
            console.log('error', error);
        });
    const pusher = new Pusher(PUSHER_APP_KEY, PUSHER_OPTIONS);
    const channel = pusher.subscribe("Question");

    channel.bind("new_question", (data) => {
      let pregunta = data.pregunta;
      pregunta &&
        this.setState({
          preguntas: [...this.state.preguntas, pregunta],
        });
      console.log(this.state.preguntas);
    });
  }
  render() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        this.state.preguntas.length > 0 && this.state.preguntas.map(pregunta => <Pregunta key={pregunta.id} pregunta={pregunta} />)
                    }
                </div>
            </div>
        </section>
    );
  }
}

export default Home;

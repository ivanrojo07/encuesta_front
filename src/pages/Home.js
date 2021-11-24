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
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-wrap m-4">
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

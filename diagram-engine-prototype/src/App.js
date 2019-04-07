import React from 'react';
import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	DiagramWidget,
} from 'storm-react-diagrams';
import './App.css';
import 'storm-react-diagrams/dist/style.min.css';

class App extends React.Component {

  componentDidMount() {
    document.addEventListener("touchstart", this.touchHandler, true);
    document.addEventListener("touchmove", this.touchHandler, true);
    document.addEventListener("touchend", this.touchHandler, true);
    document.addEventListener("touchcancel", this.touchHandler, true);
  }

  touchHandler = (event) => {
      var touches = event.changedTouches,
          first = touches[0],
          type = "";
      switch(event.type)
      {
          case "touchstart": type = "mousedown"; break;
          case "touchmove":  type = "mousemove"; break;        
          case "touchend":   type = "mouseup";   break;
          default:           return;
      }

      // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
      //                screenX, screenY, clientX, clientY, ctrlKey, 
      //                altKey, shiftKey, metaKey, button, relatedTarget);

      var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                    first.screenX, first.screenY, 
                                    first.clientX, first.clientY, false, 
                                    false, false, false, 0/*left*/, null);

      first.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
  }

  render() {
    const engine = new DiagramEngine();
    engine.installDefaultFactories();

    //2) setup the diagram model
    const model = new DiagramModel();

    //3-A) create a default node
    const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
    const port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    //3-B) create another default node
    const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
    const port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    //4) add the models to the root graph
    model.addAll(node1, node2);

    console.log(model, node1, node2);

    //5) load model into engine
    engine.setDiagramModel(model);

    return (
      <div className="App">
        <button
          onClick={() => {
            console.log(model.serializeDiagram());
          }}
        >
          Serialize Graph
        </button>
        <DiagramWidget 
          className="srd-demo-canvas"
          diagramEngine={engine}
          onMouseOver={console.warn}
        />
      </div>
    );
  }
}

export default App;

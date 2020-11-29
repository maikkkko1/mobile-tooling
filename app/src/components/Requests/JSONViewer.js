import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export default class JSONViewer extends Component {
  state = {
    open: this.props.open,
  };

  render() {
    return (
      <Modal
        size="lg"
        isOpen={this.state.open}
        toggle={() => this.props.toggle(this.props.name)}
      >
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel">
            {this.props.title}
          </h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={() => this.props.toggle(this.props.name)}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <ModalBody>
          <div className="container column">
            <div className="col-md-12 text-left">
              <h4 className="text-black">Body:</h4>
              <pre className="text-black">
                <code>
                  {JSON.stringify(this.props.responseJson, undefined, 2)}
                </code>
              </pre>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => this.props.toggle(this.props.name)}
            color="primary"
          >
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

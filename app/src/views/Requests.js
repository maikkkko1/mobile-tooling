/* eslint no-use-before-define: 0 */

import AppNavbar from "components/Navbars/AppNavbar";
import React from "react";

import JSONViewer from "components/Requests/JSONViewer";
import Alert from "reactstrap/lib/Alert";
import RequestsHandler from "handlers/RequestsHandler";
import Button from "reactstrap/lib/Button";

class Requests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestsList: [],
      selectedRequest: {},
      showAlertError: false,
      alertErrorMessage: "",
      responseModal: false,
      requestModal: false,
      key: null,
    };

    this.onModalClosed = this.onModalClosed.bind(this);
  }

  onModalClosed(modal) {
    switch (modal) {
      case "request":
        return this.setState({
          requestModal: false,
          key: null,
        });

      case "response":
        return this.setState({
          responseModal: false,
          key: null,
        });

      default:
    }
  }

  toggleResponseModal(request) {
    const data = JSON.stringify(request.response);

    if (data && data.length >= 3000) {
      this.setState({
        alertErrorMessage: "JSON da resposta muito grande para ser exibida.",
        showAlertError: true,
      });

      setTimeout(() => {
        this.setState({ showAlertError: false });
      }, 5000);
    }

    this.setState({
      selectedRequest: request,
      key: request.id + "1",
      responseModal: !this.state.responseModal,
    });
  }

  toggleRequestModal(request) {
    const data = JSON.stringify(request.response);

    if (data && data.length >= 3000) {
      this.setState({
        alertErrorMessage: "JSON da requisição muito grande para ser exibida.",
        showAlertError: true,
      });

      setTimeout(() => {
        this.setState({ showAlertError: false });
      }, 5000);
    }

    this.setState({
      selectedRequest: request,
      key: request.id + "2",
      requestModal: !this.state.requestModal,
    });
  }

  componentDidMount() {
    this.requestsListener();

    document.body.classList.toggle("landing-page");
  }

  componentWillUnmount() {
    clearInterval(this.requestsInterval);

    document.body.classList.toggle("landing-page");
  }

  async requestsListener() {
    const setRequests = (requestsList) => {
      this.setState({ requestsList: requestsList });
    };

    const firstRequestsCall = await RequestsHandler.getRequests();

    setRequests(firstRequestsCall.data.result);

    this.requestsInterval = setInterval(async () => {
      const requests = await RequestsHandler.getRequests();

      setRequests(requests.data.result);
    }, 3500);
  }

  async clearRequests() {
    await RequestsHandler.clearRequests();
  }

  wrapUrl(url) {
    if (url.length >= 180) {
      return url.substring(0, 180) + "...";
    }

    return url;
  }

  render() {
    return (
      <>
        <AppNavbar />
        <div className="mb-5">
          <div className="page-header">
            <div className="content text-left container">
              <Alert isOpen={this.state.showAlertError} color="danger">
                {this.state.alertErrorMessage}
              </Alert>
              <h2>Requisições</h2>
              <p>
                <small>Últimas 100 requisições em tempo real.</small>
              </p>
              <Button
                onClick={() => this.clearRequests()}
                size="sm"
                className="mt-2"
                color="danger"
              >
                Limpar requisições
              </Button>

              {this.state.requestsList.length === 0 ? (
                <h4 className="mt-5">Nenhuma requisição encontrada.</h4>
              ) : null}

              {this.state.requestsList.length > 0 ? (
                <table className="table table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">Data/hora</th>
                      <th scope="col">Aparelho</th>
                      <th scope="col">URL</th>
                      <th scope="col">Method</th>
                      <th scope="col">Code</th>
                      <th scope="col">Request</th>
                      <th scope="col">Response</th>
                    </tr>
                    {this.state.requestsList.map((request, i) => {
                      return (
                        <tr key={i}>
                          <td>{request.createdAt}</td>
                          <td>{request.device}</td>
                          <td
                            className="font-weight-bold"
                            title={request.url}
                            style={{ width: 20 }}
                          >
                            {this.wrapUrl(request.url)}
                          </td>
                          <td>{request.method}</td>
                          <td>
                            <span
                              className="font-weight-bold"
                              style={{
                                color:
                                  request.httpCode === 200
                                    ? "green"
                                    : "orangered",
                              }}
                            >
                              {request.httpCode}
                            </span>
                          </td>
                          <td>
                            <span
                              title={JSON.stringify(request.body)}
                              className="font-weight-bold cursor-pointer"
                              onClick={() => this.toggleRequestModal(request)}
                            >
                              Visualizar
                            </span>
                          </td>

                          <td>
                            <span
                              title={JSON.stringify(request.response)}
                              className="font-weight-bold cursor-pointer"
                              onClick={() => this.toggleResponseModal(request)}
                            >
                              Visualizar
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
        <JSONViewer
          title="Response da requisição"
          responseJson={this.state.selectedRequest.response}
          key={this.state.key + 1}
          open={this.state.responseModal}
          toggle={this.onModalClosed}
          name="response"
        />

        <JSONViewer
          title="Request da requisição"
          responseJson={this.state.selectedRequest.body}
          key={this.state.key + 2}
          open={this.state.requestModal}
          toggle={this.onModalClosed}
          name="request"
        />
      </>
    );
  }
}

export default Requests;

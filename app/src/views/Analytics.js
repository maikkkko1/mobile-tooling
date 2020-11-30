import AppNavbar from "components/Navbars/AppNavbar";
import React from "react";

import JSONViewer from "components/Requests/JSONViewer";
import AnalyticsHandler from "handlers/AnalyticsHandler";

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsList: [],
      selectedEvent: {},
      eventValueModal: false,
      key: null,
    };

    this.onModalClosed = this.onModalClosed.bind(this);
  }

  onModalClosed(modal) {
    switch (modal) {
      case "eventValueModal":
        return this.setState({
          eventValueModal: false,
          key: null,
        });

      default:
    }
  }

  toggleEventValueModal(event) {
    this.setState({
      selectedEvent: event,
      key: event.id + "1",
      eventValueModal: !this.state.eventValueModal,
    });
  }

  componentDidMount() {
    this.analyticsEventsListener();

    document.body.classList.toggle("landing-page");
  }

  componentWillUnmount() {
    clearInterval(this.analyticsInterval);

    document.body.classList.toggle("landing-page");
  }

  async analyticsEventsListener() {
    const setEvents = (eventsList) => {
      this.setState({
        eventsList: eventsList,
      });
    };

    const firstEventsCall = await AnalyticsHandler.getAnalyticsEvents();

    setEvents(firstEventsCall.data.result);

    this.analyticsInterval = setInterval(async () => {
      const events = await AnalyticsHandler.getAnalyticsEvents();

      setEvents(events.data.result);
    }, 3500);
  }

  render() {
    return (
      <>
        <AppNavbar />
        <div className="mb-5">
          <div className="page-header">
            <div className="content text-left container">
              <h2>Firebase Analytics Events</h2>
              <p>
                <small>Eventos do Firebase Analytics em tempo real.</small>
              </p>

              {this.state.eventsList.length === 0 ? (
                <h4 className="mt-5">Nenhum evento encontrado.</h4>
              ) : null}

              {this.state.eventsList.length > 0 ? (
                <table className="table table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">Data/hora</th>
                      <th scope="col">Chave</th>
                      <th scope="col">Valor</th>
                    </tr>
                    {this.state.eventsList.map((event, i) => {
                      return (
                        <tr key={i}>
                          <td>{event.createdAt}</td>
                          <td className="font-weight-bold">{event.eventKey}</td>
                          <td>
                            <span
                              title={JSON.stringify(event.eventValue)}
                              className="font-weight-bold cursor-pointer"
                              onClick={() => this.toggleEventValueModal(event)}
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
          title="Valor do evento"
          responseJson={this.state.selectedEvent.eventValue}
          key={this.state.key + 1}
          open={this.state.eventValueModal}
          toggle={this.onModalClosed}
          name="eventValueModal"
        />
      </>
    );
  }
}

export default Analytics;

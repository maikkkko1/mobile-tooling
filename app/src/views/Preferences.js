import AppNavbar from "components/Navbars/AppNavbar";
import React from "react";

import PreferencesHandler from "handlers/PreferencesHandler";
import JSONViewer from "components/Requests/JSONViewer";

class Preferences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preferencesList: [],
      selectedPreference: {},
      keyValueModal: false,
      key: null,
      lastUpdated: null,
    };

    this.onModalClosed = this.onModalClosed.bind(this);
  }

  onModalClosed(modal) {
    switch (modal) {
      case "keyValue":
        return this.setState({
          keyValueModal: false,
          key: null,
        });

      default:
    }
  }

  toggleKeyValueModal(preference) {
    this.setState({
      selectedPreference: preference,
      key: preference.id + "1",
      keyValueModal: !this.state.keyValueModal,
    });
  }

  componentDidMount() {
    this.preferencesListener();

    document.body.classList.toggle("landing-page");
  }

  componentWillUnmount() {
    clearInterval(this.preferencesInterval);

    document.body.classList.toggle("landing-page");
  }

  async preferencesListener() {
    const setPreferences = (preferencesList) => {
      this.setState({
        preferencesList: preferencesList,
        lastUpdated: new Date().toLocaleString(),
      });
    };

    const firstPreferencesCall = await PreferencesHandler.getPreferences();

    setPreferences(firstPreferencesCall.data.result);

    this.preferencesInterval = setInterval(async () => {
      const preferences = await PreferencesHandler.getPreferences();

      setPreferences(preferences.data.result);
    }, 10000);
  }

  render() {
    return (
      <>
        <AppNavbar />
        <div className="mb-5">
          <div className="page-header">
            <div className="content text-left container">
              <h2>Shared Preferences</h2>
              <p>
                <small>
                  Atualiza ao iniciar o aplicativo - Atualizado em:
                  <span className="font-weight-bold">
                    {" "}
                    {this.state.lastUpdated}
                  </span>
                </small>
              </p>

              {this.state.preferencesList.length === 0 ? (
                <h4 className="mt-5">Nenhuma shared preference encontrada.</h4>
              ) : null}

              {this.state.preferencesList.length > 0 ? (
                <table className="table table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">Data/hora</th>
                      <th scope="col">Chave pai</th>
                      <th scope="col">Chave</th>
                      <th scope="col">Valor</th>
                    </tr>
                    {this.state.preferencesList.map((preference, i) => {
                      return (
                        <tr key={i}>
                          <td>{preference.createdAt}</td>
                          <td>{preference.parentKey}</td>
                          <td className="font-weight-bold">
                            {preference.keyName}
                          </td>
                          <td>
                            <span
                              title={JSON.stringify(preference.keyValue)}
                              className="font-weight-bold cursor-pointer"
                              onClick={() =>
                                this.toggleKeyValueModal(preference)
                              }
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
          title="Valor da chave"
          responseJson={this.state.selectedPreference.keyValue}
          key={this.state.key + 1}
          open={this.state.keyValueModal}
          toggle={this.onModalClosed}
          name="keyValue"
        />
      </>
    );
  }
}

export default Preferences;

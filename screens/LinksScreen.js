import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  RefreshControl
} from "react-native";
import Modal from 'react-native-modal';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }
   WrapperComponent() {
    return (
      <View>
        <Modal>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    )
  }

  componentDidMount() {
    fetch("https://webattackapi.azurewebsites.net/api/Admin/request-stream")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => console.log(error));
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
    );
  };

  renderItem = (data) => (
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{data.item.path}</Text>
      <Text style={styles.lightText}>{data.item.statusCode}</Text>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>       
          <FlatList            
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListHeaderComponent={() => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "blue" }}>Path</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "blue" }}>Status</Text>

              </View>
            )}
            renderItem={(item) => this.renderItem(item)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

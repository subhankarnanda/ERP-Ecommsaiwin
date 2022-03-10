import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import SearchBar from "../../components/common/serchBar/searchBar";
import { connect } from "react-redux";
import AddModal from "../../components/addModal/addModal";
import Button from "../../components/common/buttom/button";
import StateModal from "./stateModal";
import { addState } from "../../redux/actions/states.action";
import { Styles } from "../../globalStyle";
import { DimensionContext } from "../../components/dimensionContext";

const State = ({ addState, states, country }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const { window } = useContext(DimensionContext);

  const handleCallback = (childData) => {
    setModalVisible(childData);
    setSelected({});
  };
  const handleItemCallback = (childData) => {
    setSelected(childData);
    setModalVisible(true);
  };

  return (
    <View style={[Styles.container]}>
      <View
        style={{
          flexDirection: "row-reverse",
        }}
      >
        <Button
          title="Add State"
          pressFunc={() => {
            setModalVisible(true);
          }}
        ></Button>
      </View>
      <View
        style={{
          width:
            window.width >= 1040
              ? window.width / 4
              : window.width >= 960 && window.width < 1040
              ? window.width / 3
              : window.width >= 641 && window.width < 960
              ? window.width / 2
              : window.width - 20,
          paddingTop: 20,
        }}
      >
        <SearchBar
          placeholder="Search state"
          renderData={states}
          onSelection={handleItemCallback}
        ></SearchBar>
      </View>
      <View>
        <AddModal
          showModal={modalVisible}
          onSelection={handleCallback}
          modalViewStyle={{
            maxWidth:
              window.width > 960
                ? window.width / 3
                : window.width >= 641 && window.width <= 960
                ? window.width / 2
                : window.width <= 641 && window.width >= 500
                ? window.width / 1.5
                : window.width <= 500 && window.width >= 360
                ? window.width / 1.2
                : window.width - 60,
            minWidth:
              window.width >= 960
                ? window.width / 3
                : window.width >= 641 && window.width <= 960
                ? window.width / 2
                : window.width <= 641 && window.width >= 500
                ? window.width / 1.5
                : window.width <= 500 && window.width >= 360
                ? window.width / 1.2
                : window.width - 60,
            flexDirection: "column",
            paddingTop: 20,
            paddingBottom: window.width > 360 ? 20 : 10,
            paddingLeft: window.width > 360 ? 40 : 10,
            paddingRight: window.width > 360 ? 40 : 10,
            borderRadius: 6,
            backgroundColor: "#fefefe",
          }}
          add={
            <StateModal
              state={selected}
              country={country}
              onChange={(business) => {
                addState(business).then(() => setSelected(false));
                setModalVisible(false);
              }}
            ></StateModal>
          }
        ></AddModal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = ({ states, country }) => ({ states, country });

export default connect(mapStateToProps, { addState })(State);
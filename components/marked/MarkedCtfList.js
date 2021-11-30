import React, { useState, useEffect, useReducer } from "react";
import { Text, ScrollView } from "react-native";
import MarkedCtfCard from "./MarkedCtfCard";

// IMPORT FOR API TEST
import { fetchCtfInfo } from "../../api/fetch";
    
let initFlag = false;

const MarkedCtfList = ({ navigation }) => {
  const [markedCtfs, updateMarkedCtfs] = useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const deleteMarkedCtfList = (id) => {
    let tmpMarkedCtfs = markedCtfs;
    const deleteIndex = tmpMarkedCtfs.findIndex(function(item) {
      return item.id === id;
    });

    console.log("Delete ID: " + tmpMarkedCtfs[deleteIndex].id);
    // database delete function add
    tmpMarkedCtfs.splice(deleteIndex, 1);
    updateMarkedCtfs(tmpMarkedCtfs);
    forceUpdate();
  }
  
  const updateMarkedCtfList = async (startTime) => {
    // call database select function -> ctfs = select(???)
    let newMarkedCtfList = await fetchCtfInfo(startTime=startTime);
    updateMarkedCtfs(newMarkedCtfList);
  }
  
  if (!initFlag) {
    initFlag = true;
    updateMarkedCtfList();
  }

  useEffect(() => {
    console.log("Render complete");
  });
  return (
    <ScrollView>
      {markedCtfs.map((markedCtf) => (
        <MarkedCtfCard
          key={markedCtf.id}
          markedCtfs={markedCtfs}
          deleteMarkedCtfs={deleteMarkedCtfList}
          {...markedCtf}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default MarkedCtfList;

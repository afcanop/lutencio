import { XCircle } from "@tamagui/lucide-icons";
import React from "react";
import { Dimensions, FlatList, ImageBackground } from "react-native";
import { Button, View } from "tamagui";

const { width } = Dimensions.get("window");

const EntregaImagenesPreview = ({
  arrImagenes,
  removerFoto,
}: {
  arrImagenes: { uri: string }[];
  removerFoto?: (index: number) => void;
}) => {  
  return (
    <View>
      <FlatList
        snapToInterval={width - 65}
        horizontal
        data={arrImagenes}
        renderItem={({ item, index }) => (
          <ImageBackground
            source={{ uri: item.uri }}
            imageStyle={{ borderRadius: 15 }}
            style={{
              height: item.uri ? 180 : 0,
              width: width-110,
              marginVertical: item.uri ? 5 : 0,
              alignItems: "flex-end",
              marginRight: 20,
            }}
          >
            {removerFoto !== undefined ? (
              <Button
                size="$4"
                circular
                icon={<XCircle size="$3" color={"red"} />}
                onPress={() => removerFoto(index)}
              />
            ) : null}
          </ImageBackground>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default EntregaImagenesPreview;

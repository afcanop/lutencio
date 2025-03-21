import { cerrarSesionUsuario } from "@/store/reducers/usuarioReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Home, LogOut, Settings, StickyNote } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { ListItem, XStack, YGroup } from "tamagui";

export default function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const MENU_ITEMS: Record<string, { icon: any; ruta: string }> = {
    home: { icon: Home, ruta: "/(app)/(maindreawer)" },
    entrega: { icon: StickyNote, ruta: "/(app)/(maindreawer)/entrega" },
  };

  const cerrarSession = () => {
    return Alert.alert(
      "Cerrar sesión",
      "Esta seguro de cerrar la sesión",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            await AsyncStorage.removeItem("jwtToken");
            dispatch(cerrarSesionUsuario());
            router.navigate("/(app)/(login)");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const navegar = (ruta: any) => {
    router.push(ruta);
  };

  return (
    <DrawerContentScrollView {...props}>
      <XStack $sm={{ flexDirection: "column" }}>
        <YGroup width={300} size="$4">
          {Object.keys(MENU_ITEMS).map((name: any, index: number) =>
            CutomDrawerContentItem(index, name)
          )}

          <YGroup width={300} size="$4">
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                style={{ backgroundColor: "white" }}
                icon={LogOut}
                title={"Salir"}
                onPress={() => cerrarSession()}
              />
            </YGroup.Item>
          </YGroup>
        </YGroup>
      </XStack>
      <XStack $sm={{ flexDirection: "column" }}></XStack>
    </DrawerContentScrollView>
  );

  function CutomDrawerContentItem(index: number, name: string) {
    const item = MENU_ITEMS[name] || MENU_ITEMS.home; // Usa home si no encuentra el nombre
    const IconComponent = item.icon;

    return (
      <YGroup.Item key={index.toString()}>
        <ListItem
          hoverTheme
          pressTheme
          style={{ backgroundColor: "white" }}
          icon={IconComponent}
          title={name}
          onPress={() => navegar(item.ruta)}
        />
      </YGroup.Item>
    );
  }
}

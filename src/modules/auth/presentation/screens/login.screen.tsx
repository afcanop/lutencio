import Titulo from "@/src/shared/components/comun/titulo";
import { BasicInput } from "@/src/shared/components/form/inputs/basic-Input";
import { PasswordInput } from "@/src/shared/components/form/inputs/password-Input";
import MensajeModoPrueba from "@/src/modules/auth/presentation/components/mensaje-modo-prueba";
import ModoPruebaSheet from "@/src/modules/auth/presentation/components/modo-prueba-sheet";
import { Validaciones } from "@/src/core/constants";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ScrollView, Spinner, View, XStack } from "tamagui";
import { useLoginViewModel } from "../../application/view-models/use-login.view-model";
import ReusableSheet from "@/src/shared/components/comun/modal-sheet";

export default function LoginScreen() {
  const {
    control,
    modoPrueba,
    loading,
    handleNagevarOlvideClave,
    handleNavegarRegistrarse,
    handleSubmit,
    submit,
  } = useLoginViewModel();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <XStack justify={"space-between"}>
          <Titulo texto="Ingresar" />
          <ReusableSheet
            triggerText="Configuración"
            initialSnapMode="constant"
            initialModalType={false}
            customSnapPoints={[300, 200]}
            sheetContents={(props) => <ModoPruebaSheet {...props} />}
            sheetProps={{
              animation: 'quick',
              overlayStyle: { backgroundColor: 'rgba(0,0,0,0.7)' }
            }}
          />
        </XStack>
        <View gap="$4" flex={1} paddingInline="$4">
          {modoPrueba ? <MensajeModoPrueba></MensajeModoPrueba> : null}
          <BasicInput
            name="username"
            control={control}
            label="Correo"
            isRequired={true}
            keyboardType="email-address"
            placeholder="Introduce tu correo"
            rules={{
              required: Validaciones.comunes.requerido,
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                message: Validaciones.comunes.correoNoValido,
              },
            }}
          />
          <PasswordInput
            name="password"
            control={control}
            label="Clave"
            isRequired={true}
            rules={{
              required: Validaciones.comunes.requerido,
              minLength: {
                value: 8,
                message: Validaciones.comunes.minimoCaracteres + 8,
              },
            }}
          />
          <Button
            theme="blue"
            icon={loading ? () => <Spinner /> : undefined}
            onPress={handleSubmit(submit)}
          >
            Ingresar
          </Button>

          <Button
            theme="blue"
            variant="outlined"
            onPress={handleNavegarRegistrarse}
            chromeless
          >
            Crear cuenta
          </Button>

          <Button
            theme="blue"
            variant="outlined"
            onPress={handleNagevarOlvideClave}
            chromeless
          >
            ¿Olvidaste la contraseña?
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

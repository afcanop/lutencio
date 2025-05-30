import { SelectInputProps } from '@/src/shared/interface/forms';
import { Picker } from '@react-native-picker/picker';
import { Controller } from "react-hook-form";
import { Label, Text, View } from "tamagui";


export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  rules,
  placeholder = 'Seleccionar',
  label,
  isRequired = false,
  data = [],
}) => {
  return (
    <View mb="$3">
      <Label fontSize="$4" mb="$2">
        {label}
        {isRequired && (
          <Text color="$red10" paddingStart="$2">
            {' '}*
          </Text>
        )}
      </Label>
      
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <View 
              borderWidth={1} 
              borderColor={error ? "$red10" : "$borderColor"} 
              borderRadius="$2"
            >
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
              >
                <Picker.Item label={placeholder} value="0" />
                {data.map((item) => (
                  <Picker.Item 
                    key={item.id.toString()} 
                    label={item.nombre} 
                    value={item.id} 
                  />
                ))}
              </Picker>
            </View>
            
            {error && (
              <Text color="$red10" fontSize="$3" mt="$1">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

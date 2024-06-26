import { Button, ButtonIcon, ButtonText, Center, Divider, EyeIcon, EyeOffIcon, Input, InputField, Text } from "@gluestack-ui/themed";
import { useContext, useState } from "react";
import { UserProps } from "../context/intefaces";
import { ContextArea } from "../context/context";

export function Login() {
  const { handleAuthContext } = useContext(ContextArea)

  const [type, setType] = useState<"Login"|"Register">("Login");
  const [data,setData] = useState<UserProps>({
    id:"",
    name: "",
    email: "",
    password: ""
  })
  const [securetyPassword,setSecuretyPassword] = useState<boolean>(true)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(data.email) ? false : true

  return(
    <Center h='100%' p='$2' gap={10}>
      <Text size="xl" marginBottom={20}>{type}</Text>
      {type === "Login" ? null : 
        <Input
          variant="outline"
          size="lg"
          isInvalid={data.name.length < 4}
          w="90%"
        >
          <InputField 
            value={data.name} 
            onChangeText ={txt=>setData({...data,name:txt})} 
            placeholder="Enter Name" />
        </Input>
      }
      
      <Input
        variant="outline"
        size="lg"
        w="90%"
        isInvalid={emailValid}
      >
        <InputField 
          value={data.email} 
          onChangeText ={txt=>setData({...data,email:txt})} 
          placeholder="Enter E-Mail" />
      </Input>
      <Input
        variant="outline"
        size="lg"
        w="90%"
        isInvalid={type== "Login"? false : data.password.length < 6 ? true : false}
      >
        <InputField 
          value={data.password} 
          onChangeText ={txt=>setData({...data,password:txt})} 
          placeholder="Enter Password" secureTextEntry={securetyPassword}/>
        <Button size="md" mx="$2" variant="link" action="secondary"
          onPress={()=>setSecuretyPassword(!securetyPassword)}
        >
          <ButtonIcon as={securetyPassword? EyeIcon : EyeOffIcon} />
        </Button>
      </Input>
      
      <Button size="lg" w="90%" marginTop={20} variant="solid" action="primary" isFocusVisible={false} 
        onPress={()=>{handleAuthContext(type.toLocaleLowerCase(), data)}}
      >
        <ButtonText>{type}</ButtonText>
      </Button>

      <Divider my="$0.5" />

      <Button size="lg" variant="link" action="primary" isDisabled={false} isFocusVisible={false} 
        onPress={() => setType( type == "Login" ? "Register" : "Login" )}
      >
        <ButtonText>Mudar para {type == "Login" ? "Register" : "Login" }</ButtonText>
      </Button>
      
    </Center>
  )
}
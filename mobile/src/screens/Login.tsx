import { Button, ButtonText, Center, Divider, Input, InputField, Text } from "@gluestack-ui/themed";
import { useState } from "react";

interface PropsData{
  name: string;
  email: string;
  password: string;
}

export function Login() {
  const [type, setType] = useState<"Login"|"Register">("Login");
  const [data,setData] = useState<PropsData>({
    name: "",
    email: "",
    password: ""
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return(
    <Center h='100%' p='$10' gap={10}>
      <Text size="xl">{type}</Text>

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
        isInvalid={emailRegex.test(data.email)}
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
        isInvalid={type== "Login"? false : data.name.length < 6}
      >
        <InputField 
          value={data.password} 
          onChangeText ={txt=>setData({...data,password:txt})} 
          placeholder="Enter Password" secureTextEntry={true}/>
      </Input>
      
      <Button size="lg" w="90%" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} 
        onClick={()=>console.log(data)}
      >
        <ButtonText>{type}</ButtonText>
      </Button>

      <Divider my="$0.5" />

      <Button size="lg" variant="link" action="primary" isDisabled={false} isFocusVisible={false} 
        onClick={() => setType( type == "Login" ? "Register" : "Login" )}
      >
        <ButtonText>Mudar para {type}</ButtonText>
      </Button>
      
    </Center>
  )
}
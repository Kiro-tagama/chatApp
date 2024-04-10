import { Text, View, Input, InputField, Spinner, FlatList, Box, HStack, VStack, Button, ButtonText, AddIcon, ButtonIcon, Icon, TrashIcon } from "@gluestack-ui/themed";
import { useContext, useState, useEffect } from "react";
import { UserProps } from "../context/intefaces";
import { ContextArea } from "../context/context";
import { baseUser } from "../context/api";
import axios from "axios"

export function Home() {
  const { userData, getChatData } = useContext(ContextArea)
  const [search,setSearch] = useState<string>("")
  const [peopleList,setPeopleList] = useState<UserProps[] | null>(null)

  async function findUser() {
    try{  
      axios.get(baseUser.findUser(search))
      .then((res)=>setPeopleList(res.data))
      .catch(err =>{
        console.log(err)
        return null
      });
    } catch (err) {
      return console.log(err)
    }
  }

  useEffect(()=>{
    search.length == 0 ? setPeopleList(getChatData()) : findUser()
  }, [search])

  return(
    <View p={10} h="100%">
      <Text>Home</Text>
      <Input
        variant="outline"
        size="lg"
        w="90%"
      >
        <InputField 
          value={search} 
          onChangeText ={txt=>setSearch(txt)} 
          placeholder="Search friend" />
        {search.length == 0 ? null :
        <Button size="md" mx="$2" variant="link" action="secondary"
          onPress={()=>setSearch("")}
        >
          <ButtonIcon as={TrashIcon} />
        </Button>
        }
      </Input> 
      {peopleList == null ? 
        <Spinner size="large" my="auto" />
        :
        <FlatList
          data={peopleList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}:any) => (
            <Box
              p="$2"
              rounded="$md"
              mb={5}
              mx={2}
              borderWidth="$1"
              borderColor="$secondary100"
            >
              <HStack space="md" justifyContent="space-between">
                <VStack>
                  <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
                    {item.name}
                  </Text>
                  <Text color="$coolGray600" $dark-color="$warmGray200">
                    {search.length == 0 ? "mensagem" : item.email}
                  </Text>
                </VStack>
                {search.length == 0 ?
                  <Text fontSize="$xs" color="$coolGray800" alignSelf="flex-start" $dark-color="$warmGray100">
                    12.20
                  </Text>
                  :
                  <Button size="md" my="auto" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText>Add </ButtonText>
                    <ButtonIcon as={AddIcon} />
                  </Button>
                }
              </HStack>
            </Box>
          )}
          keyExtractor={(item:any) => item.id}
        />
      }
    </View>
  )
}
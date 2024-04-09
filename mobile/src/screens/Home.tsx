import { Text, View, Input, InputField, Spinner, FlatList, Box, HStack, VStack, Button, ButtonText, AddIcon, ButtonIcon, Icon, TrashIcon } from "@gluestack-ui/themed";
import { useState, useEffect } from "react";
import { UserProps } from "../context/intefaces";

export function Home() {
  const [search,setSearch] = useState<string>("")
  const [chatList,setChatList] = useState<null | UserProps[] >(null)

  useEffect(()=>{
    search.length = 0 ?
    setChatList() :
    setChatList()
  }, [chatList])

  return(
    <View p={10} h="100%">
      <Text>Home</Text> <br/>
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
      </Input> <br/>
      {chatList == null ? 
        <Spinner size="large" my="auto" />
        :
        <FlatList
          data={chatList}
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
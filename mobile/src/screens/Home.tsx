import { Text, View, Input, InputField, Spinner, FlatList, Box, HStack, VStack, Button, ButtonText, AddIcon, ButtonIcon, TrashIcon, Center } from "@gluestack-ui/themed";
import { useContext, useState, useEffect, SetStateAction } from "react";
import { UserProps } from "../context/intefaces";
import { ContextArea } from "../context/context";
import { baseUser } from "../context/api";
import axios from "axios"
import { MenuHome } from "../components/MenuHome";
import { CardsHome } from "../components/CardsHome";

export function Home() {
  const { userData, getChatData, chatList } = useContext(ContextArea)
  const [search,setSearch] = useState<string>("")
  const [peopleList,setPeopleList] = useState<UserProps[] | null>(null)

  async function findUser() {
    try{  
      axios.get(baseUser.findUser(search))
      .then((res: { data: SetStateAction<UserProps[] | null>; })=>setPeopleList(res.data))
      .catch((err:any) =>{
        console.log(err)
        return null
      });
    } catch (err) {
      return console.log(err)
    }
  }

  useEffect(()=>{
    getChatData()
    search.length == 0 ? setPeopleList(chatList? chatList : null) : findUser()
  }, [search])

  const InputArea=(
    <Input variant="outline" size="lg"w="100%" mb={20}>
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
  )

  return(
    <View p='$5' flex={1}>
      <View mb={20} flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text size="2xl">Home</Text>
        <MenuHome/>
      </View>
      {InputArea}
      
      {peopleList == null ? 
        <Center flex={1}>
          <Spinner size="large" my="auto" />
        </Center>
        :
        <FlatList
          data={peopleList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}:any) => item.id == userData.id ? null : <CardsHome item={item} search={search}/>}
          keyExtractor={(item:any) => item.id}
        />
      }
    </View>
  )
}
import { Text, Box, HStack, VStack, Button, ButtonText, AddIcon, ButtonIcon,} from "@gluestack-ui/themed";
import { useContext} from "react";
import { ContextArea } from "../context/context";
import { UserProps } from "../context/intefaces";
import { createChat } from "../context/api";

interface CardProps{
  item: UserProps
  search: string
}

export function CardsHome({item,search}:CardProps) {
  const { userData } = useContext(ContextArea)

  return(
    <Box p="$2"  rounded="$md" mb={5} mx={2} borderWidth="$1" borderColor="$secondary100">
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
          <Button size="md" my="auto" variant="solid" 
          action="primary" onPress={()=>createChat(userData?.id,item.id)}>
            <ButtonText>Add </ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        }
      </HStack>
    </Box>
  )
}
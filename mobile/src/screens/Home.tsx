import { Text, View } from "@gluestack-ui/themed";

export function Home() {
  const [search,setSearch] = useState<string>("")
  return(
    <View>
      <Text>Home</Text>
      <Input
        variant="outline"
        size="lg"
        isInvalid={data.name.length < 4}
        w="90%"
      >
        <InputField 
          value={search} 
          onChangeText ={txt=>setSearch(txt)} 
          placeholder="Search friend" />
      </Input>
    </View>
  )
}
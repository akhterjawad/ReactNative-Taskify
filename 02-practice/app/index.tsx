// import { useState } from "react";
// import { Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";

// const index = () => {
//   const [input, setInput] = useState<string>('');
//   const [array, setarray] = useState<string[]>([])
//   function addtodo() {
//     array.push(input)
//     setarray([...array])
//     console.log(array);
//   }
//   function deletetodo(i: number) {
//     array.splice(i, 1)
//     setarray([...array])
//     console.log('delete', i);

//   }


//   return (
//     <SafeAreaView className="flex-1 border-2 border-gray-400 items-center justify-center">
//       <Text className="text-2xl">todo app</Text>
//       <TextInput
//         style={{
//           marginTop: 10,
//           borderWidth: 1,
//           width: 200,
//           borderColor: 'black',
//           borderStyle: 'solid',
//         }}
//         onChangeText={setInput}
//         value={input}
//         placeholder='enter todo ' />


//       <TouchableOpacity className="border mb-5"><Text onPress={addtodo} style={{ fontSize: 20, marginTop: 10, }}>add button</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={array}
//         renderItem={({ item, index }) => (<Text style={{ fontSize: 20, marginTop: 10, }}>{item} <TouchableOpacity className="border mb-5"><Text onPress={() => deletetodo(index)} style={{ fontSize: 20, marginTop: 10, }}>delete button</Text>
//         </TouchableOpacity></Text>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />

//     </SafeAreaView>
//   )
// }

// export default index

// import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native'
// import React, { useState } from 'react'

// const index = () => {
//   const [input, setinput] = useState<string>('')
//   const [todo, settodo] = useState<string[]>([])
//   function addtodo() {
//     todo.push(input)
//     settodo([...todo])
//     console.log(todo);

//   }
//   function deletetodo(i: number) {
//     todo.splice(i, 1)
//     settodo([...todo])
//     console.log(todo);

//   }


//   return (
//     <View>
//       <Text>todo app</Text>
//       <TextInput
//         style={{
//           marginTop: 10,
//           borderWidth: 1,
//           width: 200,
//           borderColor: 'black',
//           borderStyle: 'solid',
//         }}
//         onChangeText={setinput}
//         value={input}
//         placeholder='enter todo ' />
//       <TouchableOpacity className="border mb-5 mx-10 mt-5"><Text onPress={addtodo} style={{ fontSize: 15, margin: 10, }}>add button</Text>
//       </TouchableOpacity>

//       <FlatList

//         data={todo}
//         renderItem={({ item, index }) => (
//           <TouchableHighlight
//             key={item.toString()}>
//             <View style={{ backgroundColor: 'white' }}>
//               <Text>{item}<TouchableOpacity className="border mb-5 mx-5 "><Text onPress={()=>deletetodo(index)} style={{ fontSize: 15, margin: 10, }}>deletetodo</Text>
//               </TouchableOpacity></Text>
//             </View>
//           </TouchableHighlight>
//         )}
//       />


//     </View>
//   )
// }

// export default index

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const index = () => {
    const [data, setdata] = useState<null | []>(null)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(responseData => setdata(responseData))
            .catch(error => alert(error))
    }, [])
    interface Item {
        name: string;
        id: number;
    }

    return (
        <View>
            {data ? data.map((item: Item, index: number) => (

                // <View>

                <Text className='m-5 p-5 border' key={index}>{item.name}</Text>
                // </View>

            )) : <Text>loading</Text>
            }
        </View>
    )
}

export default index
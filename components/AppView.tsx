import { StyledComponent } from "nativewind";
import { View } from "react-native";

export default function AppView({className,children}:any) {

     return(
          <StyledComponent component={View} tw={className} >
               {children}
          </StyledComponent>
     )
}
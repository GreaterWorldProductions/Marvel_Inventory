import { MdDeleteOutline } from 'react-icons/md';

import { 
    Card, 
    CardHeader, 
    CardContent, 
    IconButton, 
    Typography
} from '@mui/material';


export const MarvelCard = ({ char, Delete }) => {

    return ( 
        <div>
           <Card elevation={3}>
               <CardHeader 
                    action={
                        <IconButton onClick={() => Delete(char.id) }>
                            <MdDeleteOutline />
                        </IconButton>
                    }
                    title= {char.name}
                    subheader={char.identity}
               />
               <CardContent>
                   <Typography>
                       {char.description}
                   </Typography>
                   <Typography variant='body2' color='textSecondary'>
                       {char.power}
                   </Typography>
               </CardContent>
           </Card>
        </div>
     );
}
 
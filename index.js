


const express=require('express');

const x=require('./x');

const path=require('path');

const app=express();

const idFilter = req => member => member.id === parseInt(req.params.id);

// Body Parser Middleware

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

const PORT=3001;

app.listen(PORT, () => console.log(`Server is Running ${PORT}`));
app.get('/api/x',(req,res)=>res.json(x));

//GET Specific USER Based on ID

app.get('/api/x/:id', (req, res) => {

const found = x.some(idFilter(req));

if (found) {

res.json(x.filter(idFilter(req)));

} else {

res.status(400).json({ msg: `No member with the id of ${req.params.id}` });

}

});
app.post('/api/x',(req,res)=>{

    const newMember={
    
    id: x.length + 1,
    
    name: req.body.name,
    
    email: req.body.email,
    
    status: 'guest'
    
    };
    
    if(!newMember.name || !newMember.email){
    
    return res.status(400).json({msg:'NAME and EMAIL Must be provided'});
    
    }
    
    x.push(newMember);
    
    res.json(x);
    
    }
    
    );
    //DELETE Specific USER Based on ID

app.delete('/api/x/:id', (req, res) => {

    const found = x.some(idFilter(req));
    
    if (found) {
    
    res.json({msg:'Deleted',
    
    members:x.filter(
    
    member=>member.id!==parseInt(req.params.id))})
    
    } else {
    
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    
    }
    
    });
    app.put('/api/x/:id',(req,res)=>

{

const found = x.some(member=>member.id===parseInt(req.params.id));

if(found)

{

const updMember=req.body;

x.forEach(

member=>{

if(member.id===parseInt(req.params.id))

{

member.name=updMember ? updMember.name : member.name;

member.email=updMember.email ? updMember.email : member.email;

res.json({msg:'Updated Details',member})

}

}

);

}

else{

res.status(400).json({msg:'No User found with ${req.params.id}'});

}

});
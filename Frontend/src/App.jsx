import Button from "./Components/Button";


const App = () => {
  return (
    <div className="flex gap-4 p-10">
      <Button 
        text="Green to Blue" 
        gradient="from-green-400 to-blue-500" 
        focusGradient="ring-green-100" 
      />
      <Button 
        text="Pink to Red" 
        gradient="from-pink-500 to-red-500" 
        focusGradient="ring-pink-100" 
      />
    </div>
  );
};

export default App;

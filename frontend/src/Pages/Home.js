export default function Home() {
  return (
    <>
      <h1 className={homeCss()}>
        Hello world!
      </h1>
    </>
  );

}

function homeCss(){
  return "text-3xl font-bold underline" 
}

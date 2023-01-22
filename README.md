# BigO() - VS Code Extension [BETA] v2.0.0

![Chrome Text Effect Vol 7](https://user-images.githubusercontent.com/91673777/213920698-f1563b07-2d49-4144-b221-43f6df6a485d.png)



<h1>Download Link</h1>
<p>https://marketplace.visualstudio.com/items?itemName=MiranAmer.bigo</p>

<h1>What This Does?</h1>
<p>This VS Code extension allows you to determine the time complexity of a your code (using Big O() notation) and also produces a more optimised version of your code. It does this by sending the code you highlight over to GPT-3, an AI model made by OpenAI. This then sends back the time complexity of the function which is shown in the bottom right of the IDE. If you choose to optimise it, GPT-3 will send back a more time efficient version of your code in a new editor on the right.</p>

<h1>How To Use The Features:</h1>
  
  <h2>How To Get Time Complexity</h2>
  <ol>
    <li>Reload VS Code After Downloading (may be slow at first as server is starting up)</li>
    <li>Highlight The Code You Want To Evaluate</li>
    <li>Click Ctrl+Shift+P Whilst Code Is Highlighted</li>
    <li>type 'Get BigO() - Time Complexity'</li>
    <li>Select It</li>
    <li>Wait For Result, It Will Appear On Bottom Right</li>
   </ol>
   
  <h2>NEW: How To Get More Efficient Code (v2.0.0)</h2>
  <ol>
    <li>Highlight The Code You Want To Optimise</li>
    <li>Click Ctrl+Shift+P Whilst Code Is Highlighted</li>
    <li>Type 'Optimise Code Efficiency'</li>
    <li>Select It</li>
    <li>Wait For Result, New Editor Will Appear With Faster Code On The Right</li>
   </ol>

<h1>Tip</h1>
<p>If Your Algorithm Takes In A Data Structure As A Parameter, Also Select The Data Structure In The Highlighted Text, Otherwise GPT-3 Wont Know The Length Of The DS.</p>

<h2>Example: Don't Do This</h2>

![image](https://user-images.githubusercontent.com/91673777/213878892-f75ab8aa-51a3-4837-9ef8-90f88f035a07.png)

<h2>DO THIS:</h2>

![image](https://user-images.githubusercontent.com/91673777/213878995-8ed56054-408a-418d-a2f9-5f8ffb823f4b.png)


<h1>Demo Vid</h1>



https://user-images.githubusercontent.com/91673777/213876020-49b30c9d-753d-4770-932f-fab68502e0c3.mp4


<h1>Running On Different Algorithms</h1>



https://user-images.githubusercontent.com/91673777/213876288-59d3dacd-a76a-4fe5-bbab-fc85621be5f8.mp4


<h1>Using Algorithm Names:</h1>






https://user-images.githubusercontent.com/91673777/213880495-333aab5c-8f0f-4c2b-9115-57060ba1c7ba.mp4



<h1>Using Optimise Code Feature</h1>



https://user-images.githubusercontent.com/91673777/213917298-82974a62-c045-4586-9f1d-3fe4b90d6633.mp4


<p>in this case, the time complexity decreased from O(n^2) -> O(n), hence making the solution faster


<h1>Future Ideas</h1>
<ul>

  <li>Add A Loading Indicator Whilst Result Is Being Fetched</li>
  <li>Provide An Option To Increase Function Speed ( e.g: O(n^2) -> O(n) )</li>
  <li>Store Highlighted Functions</h1>

</ul>

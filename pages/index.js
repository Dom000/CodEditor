import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { AiFillHtml5 } from "react-icons/ai";
import { SiCss3, SiJavascript } from "react-icons/si";
import Editor from "../component/Editor";
import DeafaultEditor from "../component/DeafaultEditor";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";

export default function Home() {
  const [isResizing, setIsResizing] = useState(false);
  const [src, setSrc] = useState("");
  const [active, setActive] = useState("html");
  const [error, setError] = useState([]);

  const [htmlcode, setHtmlCode] = useState(
    typeof window !== "undefined" && localStorage.getItem("htmlCode")
      ? localStorage.getItem("htmlCode")
      : ""
  );
  const [csscode, setCssCode] = useState(
    typeof window !== "undefined" && localStorage.getItem("htmlCode")
      ? localStorage.getItem("cssCode")
      : ""
  );
  const [jscode, setJsCode] = useState(
    typeof window !== "undefined" && localStorage.getItem("htmlCode")
      ? localStorage.getItem("jsCode")
      : ""
  );
  const [tab, setTab] = useState(<DeafaultEditor setHtmlCode={setHtmlCode} />);

  console.log(htmlcode, "html");
  console.log(csscode, "css");
  console.log(jscode, "js");
  useEffect(() => {
    // function resizableX() {
    const resizer = document.querySelector("#drager");
    resizer.addEventListener("mousedown", onmousedown);
    resizer.addEventListener("touchstart", ontouchstart);

    // for mobile
    function ontouchstart(e) {
      e.preventDefault();
      setIsResizing(true);
      resizer.addEventListener("touchmove", ontouchmove);
      resizer.addEventListener("touchend", ontouchend);
    }
    function ontouchmove(e) {
      e.preventDefault();
      const clientX = e.touches[0].clientX;
      const deltaX = clientX - (resizer._clientX || clientX);
      resizer._clientX = clientX;
      const l = resizer.previousElementSibling;
      const r = resizer.nextElementSibling;
      // LEFT
      if (deltaX < 0) {
        const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
        l.style.flex = `0 ${w < 10 ? 0 : w}px`;
        r.style.flex = "1 0";
      }
      // RIGHT
      if (deltaX > 0) {
        const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
        r.style.flex = `0 ${w < 10 ? 0 : w}px`;
        l.style.flex = "1 0";
      }
    }
    function ontouchend(e) {
      e.preventDefault();
      setIsResizing(false);
      resizer.removeEventListener("touchmove", ontouchmove);
      resizer.removeEventListener("touchend", ontouchend);
      delete e._clientX;
    }

    // for desktop
    function onmousedown(e) {
      e.preventDefault();
      setIsResizing(true);
      document.addEventListener("mousemove", onmousemove);
      document.addEventListener("mouseup", onmouseup);
    }
    function onmousemove(e) {
      e.preventDefault();
      const clientX = e.clientX;
      const deltaX = clientX - (resizer._clientX || clientX);
      resizer._clientX = clientX;
      const l = resizer.previousElementSibling;
      const r = resizer.nextElementSibling;
      // LEFT
      if (deltaX < 0) {
        const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
        l.style.flex = `0 ${w < 10 ? 0 : w}px`;
        r.style.flex = "1 0";
      }
      // RIGHT
      if (deltaX > 0) {
        const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
        r.style.flex = `0 ${w < 10 ? 0 : w}px`;
        l.style.flex = "1 0";
      }
    }
    function onmouseup(e) {
      e.preventDefault();
      setIsResizing(false);
      document.removeEventListener("mousemove", onmousemove);
      document.removeEventListener("mouseup", onmouseup);
      delete e._clientX;
    }
    // }
    // vertical direction
    // 3333333333######################################################################################

    const resizer2 = document.querySelector("#drager2");
    const resizeDiv = document.querySelector(".resizeDiv");
    resizer2.addEventListener("mousedown", onmousedown2);
    resizer2.addEventListener("touchstart", ontouchstart2);

    // for mobile
    function ontouchstart2(e) {
      e.preventDefault();
      setIsResizing(true);
      resizer2.addEventListener("touchmove", ontouchmove2);
      resizer2.addEventListener("touchend", ontouchend2);
    }
    function ontouchmove2(e) {
      e.preventDefault();
      // const clientY = e.touches[0].clientY;
      const clientY = parseInt(
        (e.touches[0].clientY / window.innerWidth) * 100
      );

      // setCounter(clientY + clientY);
      resizeDiv.style.height = `${100 - (clientY + clientY)}vh`;
      resizeDiv.style.minHeight = `10vh`;
      resizeDiv.style.maxHeight = `90vh`;
      console.log(100 - clientY, "move11");
      console.log(clientY, "screen");
    }
    function ontouchend2(e) {
      e.preventDefault();
      setIsResizing(false);
      resizer2.removeEventListener("touchmove", ontouchmove2);
      resizer2.removeEventListener("touchend", ontouchend2);
      delete e._clientY;
    }

    // for desktop
    function onmousedown2(e) {
      e.preventDefault();

      console.log(e);
      setIsResizing(true);
      document.addEventListener("mousemove", onmousemove2);
      document.addEventListener("mouseup", onmouseup2);
    }
    function onmousemove2(e) {
      e.preventDefault();
      setIsResizing(true);
      const clientY = parseInt((e.clientY / window.innerWidth) * 100);

      // setCounter(clientY + clientY);
      resizeDiv.style.height = `${100 - (clientY + clientY)}vh`;
      resizeDiv.style.minHeight = `10vh`;
      resizeDiv.style.maxHeight = `90vh`;
      console.log(100 - clientY, "move11");
      console.log(clientY, "screen");
    }
    function onmouseup2(e) {
      e.preventDefault();
      setIsResizing(false);
      document.removeEventListener("mousemove", onmousemove2);
      document.removeEventListener("mouseup", onmouseup2);
      delete e._clientY;
    }
  }, [isResizing]);

  console.log(error, "error");

  useEffect(() => {
    setError((prev) => [...prev, "compiling....."]);
    const timeout = setTimeout(() => {
      setError((prev) => [...prev, "compiled successfully"]);
      setSrc(`
        <html>
          <body>${htmlcode}</body>
          <style>${csscode}</style>
          <script>${jscode}</script>
        </html>
      `);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [htmlcode, csscode, jscode]);

  const onChange1 = useCallback(
    (value, viewUpdate) => {
      // console.log("value:", value);
      try {
        setHtmlCode(value);
        localStorage.setItem("htmlCode", value);
      } catch (error) {
        setError(error);
      }
    },
    [htmlcode]
  );
  const onChange2 = useCallback(
    (value, viewUpdate) => {
      // console.log("value:", value);
      try {
        setCssCode(value);
        localStorage.setItem("cssCode", value);
      } catch (error) {
        setError(error);
      }
    },
    [csscode]
  );
  const onChange3 = useCallback(
    (value, viewUpdate) => {
      // console.log("value:", value);
      try {
        setJsCode(value);
        localStorage.setItem("jsCode", value);
      } catch (error) {
        setError(error);
      }
    },
    [jscode]
  );

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="flex ">
          <div
            onDrag={(e) => console.log(e)}
            className="bg-[#2e2945] space-y-20 z-50 flex absolute flex-col pt-5 items-center w-[12vw] md:w-[4vw] h-screen "
          >
            <AiFillHtml5
              onClick={() => {
                setTab(
                  <Editor
                    onChange={onChange1}
                    language={html({ jsx: true })}
                    value={htmlcode}
                    type={"htmlCode"}
                  />
                );
                setActive("html");
              }}
              className={
                active === "html"
                  ? "text-orange-500 text-3xl cursor-pointer bg-[#3f385e] p-2 rounded-md"
                  : "text-orange-500 text-3xl cursor-pointer hover:bg-[#3f385e] p-1 rounded-md"
              }
            />
            <SiCss3
              onClick={() => {
                setTab(
                  <Editor
                    onChange={onChange2}
                    language={css({ jsx: true })}
                    value={csscode}
                    type={"cssCode"}
                  />
                );
                setActive("css");
              }}
              className={
                active === "css"
                  ? "text-blue-500 text-3xl cursor-pointer bg-[#3f385e] p-2 rounded-md"
                  : "text-blue-500 text-3xl cursor-pointer hover:bg-[#3f385e] p-1 rounded-md"
              }
            />
            <SiJavascript
              onClick={() => {
                setTab(
                  <Editor
                    onChange={onChange3}
                    language={javascript({ jsx: true })}
                    value={jscode}
                    type={"jsCode"}
                  />
                );
                setActive("js");
              }}
              className={
                active === "js"
                  ? "text-yellow-500 text-3xl cursor-pointer bg-[#3f385e] p-2 rounded-md"
                  : "text-yellow-500 text-3xl cursor-pointer hover:bg-[#3f385e] p-1 rounded-md"
              }
            />
          </div>
          {/* <div className=""> */}
          <div id="container" className="flex ml-10 ">
            <div
              id="left-panel"
              className={`bg-[#282A36]  max-h-[90vh] pb-10 p-2  h-[90vh] overflow-auto w-[50vw] `}
            >
              {tab}
            </div>
            <div
              id="drager"
              className={` cursor-col-resize  w-[3px] bg-slate-400 max-h-[90vh]   h-[90vh]`}
            ></div>
            <div
              id="right-panel"
              className={`pb-10 mr-10 overflow-auto p-2 pr-6 max-h-[90vh]  h-[90vh] w-[49vw] `}
            >
              <iframe
                srcDoc={src}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            </div>
          </div>

          <div
            className={`bg-[#2b2a33] overflow-auto text-white font-semibold resizeDiv absolute bottom-0 z-40 h-[10vh] w-full `}
          >
            <div
              id="drager2"
              className=" z-10 cursor-row-resize h-[5px] bg-slate-400 "
            ></div>
            {error.map((err, index) => (
              <pre key={index} className="px-12">
                {`>>`}
                {err}
              </pre>
            ))}
          </div>
        </div>
        <div
          className={`bg-[#2b2a33] text-center pb-8  text-white  absolute bottom-0 z-40 h-[3vh] w-full `}
        >
          <p className="">
            {" "}
            Built by  &nbsp;
            <a className="underline" href="https://www.linkedin.com/in/egi-godknows-21a170202/">
              Godknows Egi
            </a>
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
}

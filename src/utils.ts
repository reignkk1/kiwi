import pageConfig from "./pageConfig.json";

export function getPageConfig(pathname: string) {
  if (pathname === "/") {
    return pageConfig["home"];
  }
}

// 페이지가 홈 '/' 일때 getPageConfig는 homeConfig 타입을 리턴해주고
// 다른 페이지일 때는 그거에 맞는 config 타입을 리턴 해주게끔.

// 결론: 페이지 pathname 하나하나 설정해주자 타입을.

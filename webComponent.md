# Web Component

## Web Component Lifecycle

클래스 실행 -> 생성자 함수 실행

1. Element created -> constructor()

- Basic Initializations, Dom에 엑세스하는 것은 아니다.
- element는 메모리에 먼저 생성되며 처음에는 DOM의 일부가 아니다.

2. Element attached to DOM -> connectedCallback()

- DOM Initializations
- start DOM access

3. Element detached from DOM -> disconnectedCallback()

- cleanup Work

4. Observed Attribute updated -> attributeChangedCallback()

- Update Data + DOM

## Shadow DOM

<-> light DOM : 일반적으로 내가 알고 있는 DOM

## error

```
Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children
```

import { Injectable } from '@angular/core'

@Injectable()
export default class SignalRService {
  private connection: SignalR.Hub.Connection

  create(uri: string, hubName: string, registerProxyMethods: any): SignalR.Hub.Proxy {
    this.connection = $.hubConnection()
    this.connection.url = uri
    this.connection.logging = true
    this.connection.error((error: any) => console.error(error))

    const proxy = this.connection.createHubProxy(hubName)

    registerProxyMethods(proxy)

    this.connection.start()
      .fail((error: any) => console.error(error))

    return proxy
  }
}

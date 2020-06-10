import { ChatLogMessage } from "./models/chat-log-message";
import { Message } from "./models/message";
import { Component } from "@angular/core";
import "./utilities/date-extensions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "All chats";
  chatLogMessages: ChatLogMessage[] = [];

  ngOnInit() {
    this.getData().then(data => {
      let membersMap = this.buildLookup(data.members, "id");
      this.chatLogMessages = this.sortChronologically(
        this.combineData(data.messages, membersMap),
        "timestamp"
      );
    });
  }
  // Sort
  private sortChronologically(list, dateProperty) {
    list = [...list].sort((obj1, obj2) => {
      var date1 = new Date().setISO8601(obj1[dateProperty]);
      var date2 = new Date().setISO8601(obj2[dateProperty]);
      return date2 > date1 ? 1 : -1;
    });
    return list;
  }

  // Build an easier lookup
  private buildLookup(list, key) {
    let map = {};
    list.forEach(function(item) {
      map[item[key]] = item;
    });
    return map;
  }

  // Do the "join":
  private combineData(list: Array<Message>, map) {
    list.forEach(function(listItem) {
      let member = map[listItem.userId];
      if (member) {
        listItem.messageId = listItem.id;
        listItem.fullName = `${member.firstName} ${member.lastName}`;
        listItem.email = member.email;
        listItem.avatar = member.avatar;
        delete listItem.id;
      }
    });
    return list;
  }

  async getData() {
    const messagesResponse = await fetch("http://localhost:3001/messages");
    const membersResponse = await fetch("http://localhost:3001/members");
    return {
      messages: await messagesResponse.json(),
      members: await membersResponse.json()
    };

    // const promises = [
    //   fetch("http://localhost:3001/messages"),
    //   fetch("http://localhost:3001/members")
    // ];

    // await Promise.all(promises)
    //   .then(responses => {
    //     responses.forEach(response => {
    //       extractData(response.json());
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // const extractData = promise => {
    //   promise.then(data => {
    //     console.log(data);
    //   });
    // };
  }
}

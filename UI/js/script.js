class DivSelector {
    constructor() {
      /** Initializing Left Tabs */
      this.currentDivName = "inbox_list";
      this.composeTab = document.getElementById("compose_tab");
      this.inboxTab = document.getElementById("inbox_tab");
      this.sentTab = document.getElementById("sent_tab");
      this.draftTab = document.getElementById("draft_tab");
      this.groupTab = document.getElementById("group_tab");
      this.editDPTab = document.getElementById("editDP");
      this.logoutTab = document.getElementById("logout");
  
      this.menuBar = document.getElementById("menu_button");
      this.changePasswordTab = document.getElementById("change_password_button");
      this.viewComposeForGroups = document.querySelectorAll(
        "#listview_group > a"
      );
      this.viewInboxMessage = document.querySelectorAll("#inbox_list > a");
  
      this.listState;
  
      /** Initailizing tab for admin */
      this.adminGroupTab = document.getElementById("admin_group_tab");
  
      /** Initializing list of user view for admin */
      this.viewMembersOfGrroupForAdmin = document.querySelectorAll(
        "#admin_group > a"
      );
  
      this.adminGroupDiv = document.getElementById("admin_group"); // list of all groups for admin
      this.listOfUsersDiv = document.getElementById("list_of_users"); // list of users in a group for admin
      this.creatGroupDiv = document.getElementById("create_group");
      this.userProfileDiv = document.getElementById("user-profile");
  
      /** Attaching Event Listeners */
      this.composeTab.addEventListener("click", () => this.onComposeClicked());
      this.inboxTab.addEventListener("click", () => this.onInboxClicked());
      this.sentTab.addEventListener("click", () => this.onSentClicked());
      this.draftTab.addEventListener("click", () => this.onDraftClicked());
      this.groupTab.addEventListener("click", () => this.onGroupClicked());
      this.menuBar.addEventListener("click", () => this.onMenuBarClicked());
      for (let group of this.viewComposeForGroups) {
        group.addEventListener("click", () => this.onComposeGroupClicked());
      }
  
      for (let group of this.viewMembersOfGrroupForAdmin) {
        group.addEventListener("click", () =>
          this.onViewMembersOfGrroupForAdminClicked()
        );
      }
  
      for (let group of this.viewInboxMessage) {
        group.addEventListener("click", () => this.onViewInboxMessageClicked());
      }
  
      this.adminGroupTab.addEventListener("click", () =>
        this.onAdminGroupClicked()
      );
      document
        .querySelector("main")
        .addEventListener("click", () => this.onSideBarClicked());
      /** Floating Action Buttons (FAB) */
  
      this.sendFAB = document.getElementById("send");
      this.saveFAB = document.getElementById("save");
      this.deleteFAB = document.getElementById("delete");
      this.retractFAB = document.getElementById("retract");
      this.plusFAB = document.getElementById("plus");
      this.createFAB = document.getElementById("create");
  
      this.createFAB.addEventListener("click", () =>
        this.onViewCreateGroupClicked()
      );
      this.plusFAB.addEventListener("click", () =>
        this.onViewAddUserToGroupClicked()
      );
  
      this.fab = [
        this.sendFAB,
        this.saveFAB,
        this.deleteFAB,
        this.retractFAB,
        this.plusFAB,
        this.createFAB
      ];
  
      this.editDPTab.addEventListener("click", () => this.onEditDpClicked());
      this.logoutTab.addEventListener("click", () => this.onLogOutClicked());
      this.changePasswordTab.addEventListener("click", () =>
        this.onChangePassWordClicked()
      );
    }
  
    onLogOutClicked() {}
  
    onEditDpClicked() {
      this.onFABRemoveAll();
  
      this.saveFAB.classList.remove("no-display");
      this.changeDivTo("user_profile");
    }
  
    onChangePassWordClicked() {
      this.onFABRemoveAll();
  
      this.changeDivTo("change_password");
    }
  
    onMenuBarClicked() {
      document.querySelector("aside").style.display = "block";
    }
  
    /** Remove sideBar using viewport */
    onSideBarClicked() {
      if (window.matchMedia("(max-width: 700px)").matches) {
        document.querySelector("aside").style.display = "none";
      }
    }
  
    /** Remove all FAB */
  
    onFABRemoveAll() {
      for (let fab of this.fab) {
        fab.classList.add("no-display");
      }
    }
  
    /** Event Listeners For User Tab */
    onComposeClicked() {
      this.onFABRemoveAll();
  
      document.getElementById("group-name-label").classList.add("no-display");
      document
        .getElementById("list_of_group_members")
        .classList.add("no-display");
  
      this.sendFAB.classList.remove("no-display");
      this.saveFAB.classList.remove("no-display");
      this.changeDivTo("compose");
    }
  
    onInboxClicked() {
      this.onFABRemoveAll();
      this.listState = "inbox";
      document.querySelector("#inbox_list h1").innerHTML = "Inbox";
      this.changeDivTo("inbox_list");
    }
  
    onSentClicked() {
      this.onFABRemoveAll();
      this.listState = "sent";
      document.querySelector("#inbox_list h1").innerHTML = "Sent Items";
      this.changeDivTo("inbox_list");
    }
  
    onDraftClicked() {
      this.onFABRemoveAll();
      this.listState = "draft";
      document.querySelector("#inbox_list h1").innerHTML = "Draft";
      this.changeDivTo("inbox_list");
    }
  
    onGroupClicked() {
      this.onFABRemoveAll();
      this.changeDivTo("listview_group"); // the groups a user belongs to
    }
  
    onComposeGroupClicked() {
      this.onFABRemoveAll();
      document.getElementById("group-name-label").classList.remove("no-display");
      document
        .getElementById("list_of_group_members")
        .classList.remove("no-display");
  
      this.changeDivTo("compose");
    }
  
    onAdminGroupClicked() {
      this.onFABRemoveAll();
      this.changeDivTo("admin_group");
      this.createFAB.classList.remove("no-display");
    }
  
    onViewMembersOfGrroupForAdminClicked() {
      this.onFABRemoveAll();
      this.plusFAB.classList.remove("no-display");
      this.createFAB.classList.remove("no-display");
  
      this.changeDivTo("list_of_users");
    }
  
    onViewAddUserToGroupClicked() {
      this.onFABRemoveAll();
      document.querySelector("#create_group h1").innerHTML = "Add User";
      document.querySelector("#create_group h2").classList.remove("no-display");
      document.querySelector("#create_group ul").classList.remove("no-display");
      document
        .querySelector("#create_group #group-name")
        .classList.add("no-display");
      this.saveFAB.classList.remove("no-display");
      this.changeDivTo("create_group");
    }
  
    onViewCreateGroupClicked() {
      this.onFABRemoveAll();
      document.querySelector("#create_group h1").innerHTML = "Create Group";
      document.querySelector("#create_group h2").classList.add("no-display");
      document.querySelector("#create_group ul").classList.add("no-display");
      document
        .querySelector("#create_group #group-name")
        .classList.remove("no-display");
      this.saveFAB.classList.remove("no-display");
      this.changeDivTo("create_group");
    }
  
    onViewInboxMessageClicked() {
      this.onFABRemoveAll();
  
      this.changeDivTo("inbox_msg");
    }
  
    changeDivTo(nextDivName) {
      let visibleDiv = document.getElementById(this.currentDivName);
      let nextDiv = document.getElementById(nextDivName);
  
      if (nextDivName === "inbox_msg") {
        if (this.listState === "inbox") {
          this.deleteFAB.classList.remove("no-display");
        } else if (this.listState === "sent") {
          this.retractFAB.classList.remove("no-display");
          this.deleteFAB.classList.remove("no-display");
        } else if (this.listState === "draft") {
          this.sendFAB.classList.remove("no-display");
          this.retractFAB.classList.remove("no-display");
          this.deleteFAB.classList.remove("no-display");
        }
      }
  
      visibleDiv.classList.add("no-display");
      nextDiv.classList.remove("no-display");
      /** Remove side bar using viewport */
      this.onSideBarClicked();
  
      this.currentDivName = nextDivName;
    }
  }
  
  new DivSelector();
  
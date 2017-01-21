'use babel';

import { CompositeDisposable } from 'atom';
import { BufferedProcess } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'uuid-inserter:insert': () => this.insert()
    }));
  },

  deactivate() {

    this.subscriptions.dispose();
  },

  insert() {

    var command = 'uuidgen';
    var arguments = [];
    var stdout = function(output) {

      var editor = atom.workspace.getActiveTextEditor();
      var uuid = output.replace(/\n+$/g, '');

      editor.insertText(uuid);
    };

    var process = new BufferedProcess({ command, arguments, stdout });
  },
};

type NodeColor = 'RED' | 'BLACK';

class TreeNode<T> {
    value: T;
    color: NodeColor;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    parent: TreeNode<T> | null;

    constructor(value: T, color: NodeColor = 'RED') {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Verifica se um valor já existe na árvore
    has(value: T): boolean {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    // Inserção na árvore
    insert(value: T) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            this.root.color = 'BLACK';
            return;
        }

        // Inserção normal na BST
        let current: TreeNode<T> | null = this.root;
        while (current) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    newNode.parent = current;
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    newNode.parent = current;
                    break;
                }
                current = current.right;
            }
        }

        // Balanceamento após inserção
        this.fixInsert(newNode);
    }

    // Balanceamento após inserção
    private fixInsert(node: TreeNode<T>) {
        while (node.parent && node.parent.color === 'RED') {
            const grandparent = node.parent.parent;
            if (node.parent === grandparent?.left) {
                const uncle = grandparent?.right;
                if (uncle && uncle.color === 'RED') {
                    // Caso 1: Tio vermelho
                    node.parent.color = 'BLACK';
                    uncle.color = 'BLACK';
                    if (grandparent) grandparent.color = 'RED';
                    node = grandparent!;
                } else {
                    if (node === node.parent.right) {
                        // Caso 2: Rotação à esquerda
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    // Caso 3: Rotação à direita
                    if (node.parent) node.parent.color = 'BLACK';
                    if (grandparent) grandparent.color = 'RED';
                    if (grandparent) this.rotateRight(grandparent);
                }
            } else {
                const uncle = grandparent?.left;
                if (uncle && uncle.color === 'RED') {
                    // Caso 1: Tio vermelho
                    node.parent.color = 'BLACK';
                    uncle.color = 'BLACK';
                    if (grandparent) grandparent.color = 'RED';
                    node = grandparent!;
                } else {
                    if (node === node.parent.left) {
                        // Caso 2: Rotação à direita
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    // Caso 3: Rotação à esquerda
                    if (node.parent) node.parent.color = 'BLACK';
                    if (grandparent) grandparent.color = 'RED';
                    if (grandparent) this.rotateLeft(grandparent);
                }
            }
        }
        if (this.root) this.root.color = 'BLACK';
    }

    // Rotação à esquerda
    private rotateLeft(node: TreeNode<T>) {
        const rightChild = node.right;
        if (!rightChild) return;

        node.right = rightChild.left;
        if (rightChild.left) rightChild.left.parent = node;

        rightChild.parent = node.parent;
        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }
        rightChild.left = node;
        node.parent = rightChild;
    }

    // Rotação à direita
    private rotateRight(node: TreeNode<T>) {
        const leftChild = node.left;
        if (!leftChild) return;

        node.left = leftChild.right;
        if (leftChild.right) leftChild.right.parent = node;

        leftChild.parent = node.parent;
        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.left) {
            node.parent.left = leftChild;
        } else {
            node.parent.right = leftChild;
        }
        leftChild.right = node;
        node.parent = leftChild;
    }
}

export default RedBlackTree;

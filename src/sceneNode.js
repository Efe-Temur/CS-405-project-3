/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedModelMatrix = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());
        var transformedMvp = MatrixMult(mvp, transformedModelMatrix);
        var transformedModelView = MatrixMult(modelView, transformedModelMatrix);
        var transformedNormals = getNormalMatrix(transformedModelView);

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModelMatrix);
        }
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModelMatrix);
        }
    }

    

}